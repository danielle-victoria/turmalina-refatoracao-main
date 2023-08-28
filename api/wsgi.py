from app import main
import os

main.app.run(debug=False, port=os.environ.get('PORT', 5000), host='0.0.0.0')