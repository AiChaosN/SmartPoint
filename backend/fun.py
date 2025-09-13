from openai import OpenAI
import json
import inspect

# 初始化客户端
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def process_json(raw):
    start = raw.find("[")
    end = raw.rfind("]") + 1
    clean_json = raw[start:end]
    data = json.loads(clean_json)
    return data

def plan_to_json(plan_text: str):
    prompt = f"""
你是一个日程解析助手。请把下面的一段话拆分成多个 JSON 对象，
每个对象的 key 固定为 [tittle, time(hh:mm:ss), discripe(string), finish(bool=false)]。
时间统一为 hh:mm:ss 格式，finish 永远为 false。
只返回 JSON 数组，不要多余文字。

输入内容：
{plan_text}
"""
    response = client.chat.completions.create(
        model="gpt-4o-mini",   # 可以换成 gpt-4o 或 gpt-5
        messages=[{"role": "user", "content": prompt}],
        temperature=0
    )
    try:
        data = process_json(response.choices[0].message.content)
        print(inspect.currentframe().f_code.co_name, "success")
        return data
    except:
        print(inspect.currentframe().f_code.co_name, "error")
        return -1

def json_to_daily_overview(json_data: list):
    prompt = f"""
你是一个日程总结助手。请把下面的一段话总结成一个日程概览。
日程概览的格式为：txt文件。
输入内容：
{json_data}
"""
    response = client.chat.completions.create(
        model="gpt-4o-mini",   # 可以换成 gpt-4o 或 gpt-5
        messages=[{"role": "user", "content": prompt}],
        temperature=0
    )
    return response.choices[0].message.content