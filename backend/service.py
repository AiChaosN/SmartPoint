from connectonion import llm_do
from DataFormat import TaskData, TaskDataList


def convert_string_to_taskdata(input_string: str) -> TaskData:
    result = llm_do(
        system_prompt="convert.md",
        output=TaskData,
        input=input_string
    )
    return result

