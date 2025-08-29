# Course Automation Toolkit

This toolkit automates the creation of course content for the E-learn2-5 platform. It generates structured course data based on templates and can optionally use LLMs for enhanced content generation.

## Features

- Generate 500+ courses with realistic metadata
- Create structured course content with modules and lessons
- Map technologies to relevant skills
- Optionally use LLM to enhance course descriptions and content
- Configurable through YAML templates

## Installation

1. Ensure you have Python 3.8+ installed
2. Install the required dependencies:

```bash
pip install -r requirements.txt
```

3. If you want to use LLM features, set your OpenAI API key:

```bash
export OPENAI_API_KEY=your_api_key_here  # Linux/macOS
set OPENAI_API_KEY=your_api_key_here     # Windows
```

## Usage

### Basic Usage

Generate 500 courses with default settings:

```bash
python main.py
```

This will create a `technical_courses.json` file in the `../public/data` directory.

### Advanced Options

```bash
python main.py --template custom_template.yaml --output ./output --count 1000 --filename my_courses.json
```

### Using LLM for Enhanced Content

```bash
python main.py --use-llm
```

## Configuration

The course generation is controlled by the `course_template.yaml` file. You can customize:

- Course metadata (IDs, pricing, etc.)
- Technologies and their associated skills
- Categories and their associated skills
- Module and lesson templates
- Author names

## Files

- `main.py`: The main script for generating courses
- `course_template.yaml`: Configuration for course generation
- `llm_prompts.py`: Prompt templates for LLM content generation
- `requirements.txt`: Python dependencies

## Integration with E-learn2-5

The generated courses are compatible with the E-learn2-5 platform's existing course structure. The output JSON file can be directly used as a replacement for the `technical_courses.json` file in the platform.

## Extending

To add new technologies or categories:

1. Edit the `course_template.yaml` file
2. Add new entries to the `technologies` or `categories` sections
3. Run the generator again

## License

This toolkit is part of the E-learn2-5 project and is subject to the same license terms.