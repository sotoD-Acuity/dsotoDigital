from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_tempslate('index2.html')

@app.route('/canvas')
def canvas():
    return render_template('sketchDisplay.html')

if __name__ == '__main__':
    app.run(debug=True)
