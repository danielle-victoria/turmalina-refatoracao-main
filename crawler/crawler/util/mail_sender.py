import smtplib
import pandas as pd
from email.mime.text import MIMEText
from crawler.settings import MAIL_USER, MAIL_PASS

# Email body structure
BASE_MESSAGE = '''
<html>
<head>
<style>
    table, th, td {{
        border: 1px solid black;
        border-collapse: collapse;
        width: 90%;
    }}
    th, td {{
        padding: 5px;
        text-align: center;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 90%;
    }}
    table tbody tr:hover {{
        background-color: #dddddd;
    }}
</style>
</head>
<body>
<b>Avaliação da(s) página(s):</b><br>
{start_urls}

{sections}
</body>
</html>
'''


class MailSender:
    """Sending emails encapsulation"""

    subject = 'Avaliação Turmalina'

    def __init__(self, evaluation, start_urls, sender_address=None, sender_pass=None):
        self.sender_address = sender_address if sender_address else MAIL_USER
        self.sender_pass = sender_pass if sender_pass else MAIL_PASS
        self.evaluation = evaluation
        self.start_urls = start_urls

    def message(self, receiver_address):
        """Builds the base message for sending the email"""
        sections = '\n'.join(get_sections(self.evaluation))
        start_urls = '<br>'.join(self.start_urls)
        text = BASE_MESSAGE.format(
            start_urls=start_urls, sections=sections
        )
        message = MIMEText(text, 'html')
        message['To'] = receiver_address
        message['From'] = self.sender_address
        message['Subject'] = self.subject
        return message.as_string().encode('utf-8')

    def send(self, receiver_address):
        """Send the corresponding message"""
        message = self.message(receiver_address)
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(self.sender_address, self.sender_pass)
            server.sendmail(receiver_address, self.sender_address, message)


def get_sections(evaluation):
    """Generate the body sections of the email body

    Returns:
        string: section content
    """
    sections = []
    for key, value in evaluation.items():
        # Generate the tables
        table = pd.Series(value).apply(lambda x: 'Yes' if x else 'No')
        html_table = table.to_frame('Found').to_html()
        # Generate the table title
        title = f'<h2>{key}</h2>'
        sections.append(title+html_table)
    return sections
