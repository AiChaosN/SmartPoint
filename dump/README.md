# Struct & Data

PlanTest.txt -> 最开始的输入string，一行代表一天的
DailyTask.json -> 多行json

#
Healthy
Eat
Social

## Example

### User Input
```
今天我打算早上8点钟起床，8点半吃好早餐并把早晨的药服下，然后在9点左右去小区里散步，顺便和邻居打个招呼，中午12点半吃午饭，饭后2点再吃一次降压药，下午我准备4点打电话和老朋友聊一会儿，晚上则在6点半吃完晚饭，7点洗个澡后去隔壁家串门，一天就这样有条不紊。
```

### Translate To Json Tasks
```
[
  {
    "tittle": "起床",
    "time": "08:00:00",
    "discripe": "早上八点钟起床，开始一天的生活。",
    "finish": false
  },
  {
    "tittle": "早餐与吃药",
    "time": "08:30:00",
    "discripe": "吃好早餐并把早晨的药服下。",
    "finish": false
  },
  {
    "tittle": "散步与社交",
    "time": "09:00:00",
    "discripe": "去小区里散步，顺便和邻居打个招呼。",
    "finish": false
  },
  {
    "tittle": "午饭",
    "time": "12:30:00",
    "discripe": "中午吃午饭。",
    "finish": false
  },
  {
    "tittle": "降压药",
    "time": "14:00:00",
    "discripe": "饭后吃一次降压药。",
    "finish": false
  },
  {
    "tittle": "电话聊天",
    "time": "16:00:00",
    "discripe": "下午打电话和老朋友聊一会儿。",
    "finish": false
  },
  {
    "tittle": "晚饭",
    "time": "18:30:00",
    "discripe": "晚上吃完晚饭。",
    "finish": false
  },
  {
    "tittle": "洗澡与串门",
    "time": "19:00:00",
    "discripe": "洗个澡后去隔壁家串门。",
    "finish": false
  }
]
```