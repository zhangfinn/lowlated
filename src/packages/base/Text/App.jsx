import styles from './index.module.less'
function Text({ style, props, store, fetch }) {
  console.log(fetch)
  return (
    <div style={style} className={styles.text}>
      {props.value}
    </div>
  )
}

export default Text
