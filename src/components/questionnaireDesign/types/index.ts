// 组件分类接口
export interface ComponentType{
  type:string,
  tId:string,
  children:Array<TestComponentOption>
}

// 试卷组件配置
export interface TestComponentOption{
  label:string, // 中文显示名称
  problemId:string, // 问题类型:unitermingTopic 单选、multipleChoiceTopic 多选、judgeTopic 判断
  icon:string,
  questionName:string, // 提问的内容
  correctAnswer:unknown, // 问题的正确答案
  chooseAnswer:string, // 问题被选中的答案
  options:Array<AnswerOption>
}

// 答案选项配置
export interface AnswerOption{
  answerId:unknown, // 选项ID
  answerContent:string, // 选项内容
  chooseCount:number// 选项被选中的数量
}
