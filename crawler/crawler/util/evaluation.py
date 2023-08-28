import logging
from crawler.settings import AGREEMENT_PORTAL_URLS, AGREEMENT_PORTAL_DOMAINS
from collections.abc import MutableMapping


class Evaluation:
    """Manages the evaluation of pages analyzed by the crawler

    Returns:
        dict: score of each itemprop grouped by category
    """

    EVALUATION_MODEL = {

        'PlanningInstrument': {  # Planning tool
            'multiyearPlan': 10,  # Multi-year plan
            'budgetGuidelinesLaw': 10,  # Budget guidelines law
            'annualBudgetLaw': 10  # Annual budget law
        },

        'Bidding': {  # Bidding procedures
            'notice': 60,  # Notice
            'bidModality': 10,  # Type of bidding
            'managementUnitName': 10,  # Name of the managing unit
            'publicationDate': 10,  # Publication date
            'realizationDate': 10,  # Date of completion
            'bidID': 10,  # Bid number
            'object': 10,  # Object of the bidding
            'bidderName': 10,  # Participant's name
            'identificationNumber': 10,  # CNPJ of the participant
            'bidderProposalAmount': 10  # Proposal value
        },

        'Contract': {  # Contract
            'managementUnitName': 5,  # Name of the managing unit
            'contractorName': 5,  # Contractor's name
            'identificationNumber': 5,   # CPF/CNPJ of the contractor
            'publicationDate': 5,  # Publication date
            'validityDate': 5,  # Beginning of term
            'contractAmount': 5,  # Contract value
            'object': 5,  # Object of the contract
            'contractID': 5  # Contract code
        },

        'Agreement': {  # Health insurance
            'agreementID': 5,  # Agreement number
            'grantorName': 5,  # Grantor's name
            'contractorName': 5,  # Contractor's name
            'celebrationDate': 5,  # Celebration date
            'publicationDate': 5,  # Publication date
            'validityDate': 5,  # Beginning of term
            'object': 5, # Agreement object
            'agreementAmount': 5,  # Amount agreed
            'counterpartAmount': 5  # Countervailing value
        },

        'BudgetRevenue': {  # Budget Revenue
            'managementUnitName': 15,  # Name of the managing unit
            'predictedAmount': 15,  # Predicted value
            'collectionAmount': 15,  # Amount raised
            'budgetRevenueSource': 5,  # Origem da receita
            'budgetRevenueDescription': 5   # Recipe description
        },

        'ExtraBudgetRevenue': {  # Extrabudgetary Income
            'managementUnitName': 2,  # Name of the managing unit
            'realizedAmount': 15,  # Realized value
            'extraBudgetRevenueSource': 5,  # Source of recipe
            'extraBudgetRevenueDescription': 2,  # Recipe description
            'extraBudgetRevenueID': 1,  # Recipe code
            'nomenclature': 1,  # Nomenclature
            'extraBudgetRevenueHistory': 5  # Recipe history
        },

        'BudgetExpenditure': {  # Budget Expenses
            'fixedAmount': 5,  # Fixed amount of expense
            'paymentAmount': 5,  # Amount paid for the expense
            'managementUnitName': 10,  # Name of the managing unit
            'budgetExpenditureFunction': 5,  # Expense function
            'budgetExpenditureSubfunction': 5,  # Expense subfunction
            'budgetExpenditureProgram': 5,  # Expense program
            'budgetExpenditureAction': 5,  # Expense action
            'economicCategory': 5,  # Economic category of expense
            'budgetNature': 5,  # Type of expense group
            'budgetExpenditureModality': 5,  # Type of expense
            'budgetExpenditureElement': 5,  # Expense element
            'comittedExpenditureID': 5,  # Commitment code
            'comittedExpenditureDate': 5,  # Commitment date
            'creditorName': 10,  # Favored
            'identificationNumber': 5, # CPF/CNPJ of the beneficiary
            'bidID': 8,  # Bid number
            'bidModality': 7,  # Type of bidding
            'comittedValue': 5,  # Amount pledged
            'comittedExpenditureHistory': 25  # Effort history
        },

        'ExtraBudgetExpenditure': {  # Extrabudgetary Expenses
            'paymentAmount': 5,  # Amount paid for the expense
            'managementUnitName': 2,  # Name of the managing unit
            'extraBudgetExpenditureID': 1,  # Expense code
            'extraBudgetExpenditureNomenclature': 5,  # Expense nomenclature
            'moveDate': 2,  # Move date
            'extraBudgetExpenditureDescription': 5,  # Expense description
            'tabID': 5,  # Tab number
            'tabDate': 5,  # Tab date
            'creditorName': 10,  # Favored
            'identificationNumber': 5,  # CPF/CNPJ of the beneficiary
            'tabHistory': 25  # Tab history
        },

        'PaymentDocument': {  # Payment Document
            'managementUnitName': 5,  # Name of the managing unit
            'bankOperationID': 1,  # Bank operation number
            'bankAccountNumber': 1,  # Bank account number
            'paymentDate': 1,  # Pay day
            'creditorName': 5,  # Beneficiary's name
            'identificationNumber': 1,  # CPF/CNPJ of the beneficiary
            'paymentAmount': 5,  # Payment amount
            'fundingSource': 5,  # Resource source
            'paymentHistory': 5  # Payment history
        },

        'EmployeeInformation': {  # Guys
            'employeeName': 10,  # Server name
            'identificationNumber': 10,  # Server CPF
            'employmentContractType': 10,  # Type of link
            'employeePosition': 10,  # Office
            'employeeSalary': 10  # Wage
        }
    }

    def __init__(self):
        # transform the dict keys to lowercase
        self._transformer = KeyTransformer(
            self.EVALUATION_MODEL, lambda x: x.lower()
        )
        self._evaluation_model = self._get_model()  # scores dictionary
        self._evaluation_template = self._get_template()  # scores dictionary to fill
        self.total_score = self._compute_score(self._evaluation_model)  # max score

    def _get_model(self):
        """provides the model for evaluating the pages

        Returns:
            dict: evaluation model with keys in lowercase
        """
        return self._transformer.transform(self.EVALUATION_MODEL)

    def _get_template(self):
        """provides the template with None scores to evaluate pages

        Returns:
            dict: evaluation template with keys in lowercase
        """
        return {
            itemtype: {itemprop: None for itemprop in properties}
            for itemtype, properties in self._evaluation_model.items()
        }

    def evaluate(self, response, loginfo=''):
        """Evaluates pages, looking for the presence of itemprop referring to an itemtype

        Args:
            response (Response): HTTP response to evaluate

        Returns:
            bool: returns if the valuation dict has been updated
        """

        _log(f'evaluate url', loginfo, response.url)
        was_updated = False

        # Covenants (Agreement) can only be a link to state or federal portals
        # so if such a URL exists, Agreement should be scored completely
        for url in AGREEMENT_PORTAL_URLS:
            if url in response.url:
                _log('agreements portal found:', response.url, 'scoring all')
                self._evaluation_template['agreement']['agreementid'] = 5
                self._evaluation_template['agreement']['grantorname'] = 5
                self._evaluation_template['agreement']['contractorname'] = 5
                self._evaluation_template['agreement']['celebrationdate'] = 5
                self._evaluation_template['agreement']['publicationdate'] = 5
                self._evaluation_template['agreement']['validitydate'] = 5
                self._evaluation_template['agreement']['object'] = 5
                self._evaluation_template['agreement']['agreementamount'] = 5
                self._evaluation_template['agreement']['counterpartamount'] = 5

                was_updated = True
                return was_updated

        # If it passed the previous check and did not return, then the domains below should be ignored
        for domain in AGREEMENT_PORTAL_DOMAINS:
            if domain in response.url:
                _log('ignore url:', response.url, 'invalid domain:', domain)
                return was_updated

        _log('check itemscope, itemtype and itemprops')
        for itemscope, itemtype in _get_items(response):
            if itemtype not in self._evaluation_template:
                continue
            
            _log(f'{response.url} - itemscope {itemscope}')
            _log(f'{response.url} - itemtype {itemtype} found')
            _log(f'{response.url} - itemprops {_get_itemprops(itemscope)}')

            for itemprop in _get_itemprops(itemscope):
                try:
                    old_value = self._evaluation_template[itemtype][itemprop]
                    new_value = self._evaluation_model[itemtype][itemprop]
                except KeyError:
                    continue

                _log(f'{response.url} - itemprop {itemprop} found')

                if new_value != old_value:
                    self._evaluation_template[itemtype][itemprop] = new_value
                    was_updated = True
            else:
                _log(f'{response.url} - no itemprop found')
        else:
            _log(f'{response.url} - no itemtype found')

        return was_updated

    def _compute_score(self, evaluation):
        """Calculate the total score of an evaluation

        Args:
            evaluation (dict): evaluation to compute the total score

        Returns:
            int: total score of the inputed evaluation dict
        """

        _log('Computing score', [(key, sum([i for i in properties.values() if i is not None])) for key, properties in evaluation.items()])

        return sum(
            [sum([i for i in properties.values() if i is not None]) for properties in evaluation.values()]
        )

    @property
    def score(self):
        """Calculate the total score of the evaluation template

        Returns:
            int: total score of the evaluation
        """
        return self._compute_score(self._evaluation_template)

    def is_complete(self):
        """checks if the evaluation process has been completed"""
        return self.score == self.total_score

    def detailed_export(self):
        """Export the evaluation template with its original keys"""
        output = self._transformer.recover(self._evaluation_template)
        return output

    def summary_export(self):
        """Exports the evaluation template with the sum of its scores aggregated by itemtype"""
        output = self._transformer.recover(self._evaluation_template)
        
        _log('summary export', output.items())
        
        summary_evaluation = {
            itemtype: sum([i for i in properties.values() if i is not None])
            for itemtype, properties in output.items()
        }

        

        return summary_evaluation


class KeyTransformer:
    def __init__(self, dict_model, func):
        """Transform the keys of a dict based on a function and
        recover the original keys of a transformed dict.

        Args:
            dict_model (dict): input dict
            func (fuction): transformation function
        """
        self.func = func
        self._recovery_lookup = self._get_recovery_lookup(dict_model)

    def _get_recovery_lookup(self, dict_model):
        """Lookup table for recovering the transformed keys"""
        recovery_lookup = []
        for key, value in dict_model.items():
            if isinstance(value, MutableMapping):
                recovery_lookup.extend(
                    self._get_recovery_lookup(value).items()
                )
            recovery_lookup.append((self.func(key), key))
        return dict(recovery_lookup)

    def _transform(self, dict_model, func):
        """Generic key transform method

        Returns:
            dict: input dict with its transformed keys
        """
        new_model = dict()
        for key, value in dict_model.items():
            new_key = func(key)
            if isinstance(value, MutableMapping):
                new_model[new_key] = self._transform(value, func)
            else:
                new_model[new_key] = value
        return new_model

    def transform(self, dict_model):
        """Public method to transform an input dict based on
        the transform function passed to the constructor.

        Args:
            dict_model (dict): input dict

        Returns:
            dict: input dict with its transformed keys
        """
        return self._transform(dict_model, self.func)

    def recover(self, dict_model):
        """public method to convert a transformed dict to its original keys.

        Args:
            dict_model (dict): input dict

        Returns:
            dict: input dict with its original keys
        """
        return self._transform(
            dict_model, lambda x: self._recovery_lookup[x]
        )


# Helper Functions

def _log(*msgs):
    msgs_string = [str(msg) for msg in msgs]
    output = ' '.join(msgs_string)
    logging.info(f'[[[ARIA]]] {output}')


def _process_items(item):
    return item.strip().lower()


def _get_itemtype(element):
    itemtype = element.attrib['itemtype'].split('/')[-1]
    return _process_items(itemtype)


def _get_items(response):
    items = response.css('[itemtype]')
    itemtypes = list(map(_get_itemtype, items))
    return list(zip(items, itemtypes))


def _get_itemprops(element):
    values = element.css('[itemprop]')
    individual_props = set()

    for value in values:
        individual_props.update(value.attrib['itemprop'].split())

    return list(map(_process_items, individual_props))
