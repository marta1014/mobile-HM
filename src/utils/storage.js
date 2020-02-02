export const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  //  容错处理   尝试把data转换成js对象
  // 成功 => 数据是json格式字符串
  // 不是 json字符串 报错 => 进catch => 原样返回
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}
export const removeItem = name => {
  window.localStorage.removeItem(name)
}
