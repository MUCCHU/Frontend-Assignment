export default function genUniqueKey(item) {
  return item['jsonKey'] + '_' + item['level']
}
