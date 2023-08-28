from lxml import html
from lxml.cssselect import CSSSelector
from copy import deepcopy
from uuid import uuid4
from crawler.util.evaluation import _log


class NavigationPipeline:
    """Object that stores the instructions to be executed by a request"""

    def __init__(self, url):
        # Current page url
        self.url = url
        # Group hash code
        self.code = uuid4().hex
        # Seen elements
        self.seen = set()
        # Chain of instructions to be executed
        self.pipeline = list()

    def update(self, element):
        """Updates the chain of instructions"""
        self.pipeline.append(element)

    def see_elements(self, elements):
        """Considers a set of elements as seen"""
        self.seen = self.seen.union(elements)

    def __contains__(self, xpath):
        return xpath in self.seen

    def __str__(self):
        return f'''
            url: {self.url}
            group code: {self.code}
            pipeline: {self.pipeline}
        '''


class NavigationPipelineExtractor:

    # Selectors of the elements that need to be mapped in each response object.
    css_expressions = ['iframe', '.tm-execute']

    def __init__(self):
        # Compile the expressions
        self.selectors = [CSSSelector(expr) for expr in self.css_expressions]

    def extract_pipelines(self, response):
        """Creates a pipeline object for element that meets selector constraints and
        was not seen by existent pipeline, if any

        Args:
            response (HTTP Response): web page to be analyzed

        Returns:
            [list]: list with a pipeline for each element found
        """

        # Converts html document to lxml etree as it allows
        # finding xpath of elements based on selectors
        tree = html.fromstring(response.text).getroottree()
        # Locate the tm-execute classe and iframes
        located_elements = self._locate_elements(tree)

        if not located_elements:
            return
        del tree

        # Continue the process only with the unseen elements
        _log('pipeline located_elements before unseen filter:', located_elements)
        if response_pipeline := response.meta.get('navigation'):
            located_elements = self._get_unseen(
                response_pipeline, located_elements
            )

        # Clusters the elements into groups
        located_groups = self._get_groups(located_elements)
        _log('pipeline located_groups:', located_elements)
        elements = [str(item[0]) + str(item[2]) + str(item[3]) for item in located_elements]  # concatenate xpath, title and src to identify an element
        _log('pipeline located_elements after unseen filter:', located_elements)
        _log('pipeline elements:', elements)

        # If the response already have a pipeline use it, otherwise creates one
        base_pipeline = response_pipeline or NavigationPipeline(response.url)
        base_pipeline.see_elements(elements)
        del elements

        # Creates a new pipeline for each element
        # Afterwards, each pipeline will be a new request to the page.
        pipelines = []
        for group in located_groups:
            # Generate a hash code to identify the group
            group_code = uuid4().hex
            for element in group:
                new_pipeline = deepcopy(base_pipeline)
                new_pipeline.code = group_code
                new_pipeline.update(element)
                pipelines.append(new_pipeline)

        return pipelines

    def _locate_elements(self, tree):
        """Locate the elements that meet the constraints of the selectors

        Args:
            tree (lxml etree): etree that must have its elements mapped

        Returns:
            list: xpath of the found elements
        """
        IGNORE_TITLES = ['reCAPTCHA', 'Mapa da cidade', 'Widget de tradução de idiomas', 'o desafio reCAPTCHA expira em dois minutos']

        located_elements = []
        for selector in self.selectors:
            sel_elements = [(tree.getpath(element), get_depth(element), element.attrib.get('title'), element.attrib.get('src'), element.attrib.get('id'))
                            for element in selector(tree)]

            # ignore all tags with title in IGNORE_TITLES
            sel_elements = filter(lambda x: x[2] not in IGNORE_TITLES, sel_elements)

            located_elements.extend(sel_elements)

        _log('iframes/tm-executes found:', located_elements)

        return located_elements

    def _get_unseen(self, pipeline, located_elements):
        """Returns elements not seen by the corresponding pipeline"""
        return [item for item in located_elements if str(item[0]) + str(item[2]) + str(item[3]) not in pipeline]  # concatenate xpath, title and src to identify an element

    def _get_groups(self, located_elements):
        """clusters elements into groups, based on their respective
        depths in the html document tree

        Returns:
            list: a list of lists, in which each nested list represents a group
        """
        depths = {item[1] for item in located_elements}

        groups = [[element[0] for element in located_elements
                   if element[1] == depth] for depth in depths]

        return groups


def get_depth(node):
    """Returns the depth of an element in the html document tree"""
    depth = 0
    while node is not None:
        depth += 1
        node = node.getparent()
    return depth
