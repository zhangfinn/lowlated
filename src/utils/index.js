export const deepCopy = target => {
  if (typeof target == 'object') {
    const result = Array.isArray(target) ? [] : {}
    for (const key in target) {
      if (typeof target[key] == 'object') {
        result[key] = deepCopy(target[key])
      } else {
        result[key] = target[key]
      }
    }

    return result
  }

  return target
}

export function getStyle(style, filter = []) {
  const needUnit = [
    'fontSize',
    'width',
    'height',
    'top',
    'left',
    'borderWidth',
    'letterSpacing',
    'borderRadius'
  ]

  const result = {}
  Object.keys(style).forEach(key => {
    if (!filter.includes(key)) {
      if (key != 'rotate') {
        result[key] = style[key]

        if (needUnit.includes(key) && ![null, undefined, ''].includes(result[key])) {
          result[key] += 'px'
        }
      } else {
        result.transform = key + '(' + style[key] + 'deg)'
      }
    }
  })

  return result
}

/**
 * 生成一个用不重复的ID
 * @param { Number } randomLength
 */
export function getUuiD(randomLength) {
  return Number(Math.random().toString().substr(2, randomLength) + Date.now()).toString(36)
}
