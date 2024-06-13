from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
from time import sleep
import json



def load_page(file="file:///Users/akib/Codes/Hokulani24/demo_medical_hist.html"):
    # Set up the ChromeDriver service
    service = Service(ChromeDriverManager().install())

    # Set up the Chrome options
    options = webdriver.ChromeOptions()
    options.add_argument("--start-maximized")  # Open the browser in maximized mode
    options.add_argument("--disable-infobars")  # Disable the infobars
    options.add_argument("--disable-extensions")  # Disable extensions

    # Initialize the WebDriver instance using Chrome
    driver = webdriver.Chrome(service=service, options=options)

    # Open the website
    driver.get(file)
    return driver


def fill_form(url="http://127.0.0.1:5000", data = None, tabs = None):
    driver = load_page(url)

    sleep(1.5)

    for tab_name, ids in tabs.items():
        tab = driver.find_element(By.ID, tab_name)
        tab.click()
        sleep(0.5)
        if tab_name == 'personal-tab':
            for id in ids:
                element = driver.find_element(By.ID, id)
                element.send_keys(data[id])
        
        
        elif tab_name == 'lifestyle-tab':
            for id in ids:
                if data[id][0]: # if click Yes, add additional text
                    radio_button = driver.find_element(By.ID, id + '_yes')
                    radio_button.click()

                    input_field = driver.find_element(By.ID, id + '_input')
                    input_field.send_keys(data[id][1])
                else: #if click No, just click radio button
                    radio_button = driver.find_element(By.ID, id + '_no')
                    radio_button.click()
        
        
        elif tab_name == 'medical-history-tab':
            for id in ids:
                for _ in range(len(data[id])-1):
                    # first click "+" x times
                    add_button = driver.find_element(By.ID, id + '-add')
                    add_button.click()
                
                if id == 'Allergies': # Allergies has extra dropdown                
                    input_fields = driver.find_elements(By.CLASS_NAME, id + '-text')
                    allergy_types = driver.find_elements(By.CLASS_NAME, id + '-select')

                    for i, (input_field, allergy_type) in enumerate(zip(input_fields, allergy_types)):
                        input_field.send_keys(data[id][i]['name'])
                        allergy_type.send_keys(data[id][i]['type'])
                else:
                    input_fields = driver.find_elements(By.CLASS_NAME, id)
                    for i, input_field in enumerate(input_fields):
                        input_field.send_keys(data[id][i])

        
        elif tab_name == 'current-issue-tab':        
            for id in ids:
                if id == "CurrentSymptoms":
                    for _ in range(len(data[id])-1):
                        # first click "+" x times
                        add_button = driver.find_element(By.ID, id + '-add')
                        add_button.click()
                    
                    input_fields = driver.find_elements(By.CLASS_NAME, id)
                    for i, input_field in enumerate(input_fields):
                        input_field.send_keys(data[id][i])
                
                else:
                    input_field = driver.find_element(By.ID, id)
                    input_field.send_keys(data[id])


    driver.find_element(By.ID, 'submit-btn').click()


if __name__ == "__main__":
    data = json.load(open('data/demo_json_data/conversation_0.json'))
    tabs = {
        'personal-tab': ['Name', 'Age', 'Gender', 'Address', 'PhoneNumber', 'Email', 'Occupation', 'InsuranceCompany', 'InsurancePolicyNumber', 'PrimaryCarePhysician'],
        'lifestyle-tab': ['SmokingHistory', 'AlcoholHistory', 'DrugHistory', 'HazardousOccupation', 'SexualActivity', 'DietaryRestriction'],
        'medical-history-tab': ['Allergies', 'Medications', 'PreviousHospitalizations', 'MentalHealthHistory', 'FamilyMedicalHistory'],
        'current-issue-tab': ['ReasonForVisit', 'CurrentSymptoms', 'AdditionalComments']
    }
    fill_form(url="http://127.0.0.1:5000", data=data, tabs=tabs)


