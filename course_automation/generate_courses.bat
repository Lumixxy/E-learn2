@echo off
echo Course Automation Toolkit
echo ========================

echo Installing dependencies...
pip install -r requirements.txt

echo.
echo Generating 500 courses...
python main.py --output ../public/data --filename technical_courses.json --count 500

echo.
echo Done! Courses have been generated in ../public/data/technical_courses.json
echo You can now restart the E-learn2-5 application to see the new courses.

pause