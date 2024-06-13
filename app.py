from flask import Flask, request, render_template
import json
app = Flask(__name__, template_folder='./')

@app.route('/')
def index():
    return render_template('demo_medical_hist.html')

@app.route('/submit', methods=['POST'])
def submit():
    input_value = request.form.to_dict()
    fname = f"./saved_data/saved_data_{input_value['Name']}.json"
    with open(fname, 'w') as f:
        json.dump(input_value, f)
    return 'Data saved successfully'
if __name__ == '__main__':
    app.run(debug=True)