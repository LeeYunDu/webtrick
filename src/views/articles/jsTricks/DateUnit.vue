/**
*作者:李云都
*时间:2021年4月21日21:30:05
*/
<template>
  <div>
    <v-md-preview :text="content"></v-md-preview>
    <h4>代码</h4>
    <HighlightCode lang-type="javascriptString" :code="code"></HighlightCode>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: '获取周/月的起始/截止时间',
  author: '李云都',
  setup() {
    const content = ref(`
## 获取周/月的起始/截止时间
### 介绍
时间范围工具类
应用场景：时间选择范围 - 快速获取 每周、每月的起止时间
* 调用方法获取起止时间,时间返回格式为 yyyy-MM-dd
* 方法 获得当前日期 getNowDay
* 方法 获得本周的开始时间 getStartDayOfWeek
* 方法 获得本周的结束时间 getEndDayOfWeek
* 方法 获得本月的开始时间 getStartDayOfMonth
* 方法 获得本月的结束时间 getEndDayOfMonth
* 方法 获得本月天数 getMonthDays
* 方法 日期格式化 formatDate

`)

    const code = ref(`
function getdateUtilInstance() {
    var now = new Date() // 当前日期
    var nowDayOfWeek = now.getDay() // 今天本周的第几天
    var nowDay = now.getDate() // 当前日
    var nowMonth = now.getMonth() // 当前月
    var nowYear = now.getYear() // 当前年
    nowYear += (nowYear < 2000) ? 1900 : 0
    const dateUtil = {
      /**
   * 获得当前日期
   *
   * @returns
   */
      getNowDay() {
        return this.formatDate(new Date())
      },
      /**
   * 获得本周的开始时间
   *
   * @returns
   */
      getStartDayOfWeek() {
        var day = nowDayOfWeek || 7
        return this.formatDate(new Date(now.getFullYear(), nowMonth, nowDay + 1 - day))
      },
      /**
   * 获得本周的结束时间
   *
   * @returns
   */
      getEndDayOfWeek() {
        var day = nowDayOfWeek || 7
        return this.formatDate(new Date(now.getFullYear(), nowMonth, nowDay + 7 - day))
      },
      /**
   * 获得本月的开始时间
   *
   * @returns
   */
      getStartDayOfMonth() {
        var monthStartDate = new Date(nowYear, nowMonth, 1)
        return this.formatDate(monthStartDate)
      },
      /**
   * 获得本月的结束时间
   *
   * @returns
   */
      getEndDayOfMonth() {
        var monthEndDate = new Date(nowYear, nowMonth, this.getMonthDays())
        return this.formatDate(monthEndDate)
      },
      /**
   * 获得本月天数
   *
   * @returns
   */
      getMonthDays() {
        var monthStartDate = new Date(nowYear, nowMonth, 1)
        var monthEndDate = new Date(nowYear, nowMonth + 1, 1)
        var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24)
        return days
      },
      /**
   * @param 日期格式化
   * @returns {String}
   */
      formatDate(date) {
        var myyear = date.getFullYear()
        var mymonth = date.getMonth() + 1
        var myweekday = date.getDate()

        if (mymonth < 10) {
          mymonth = '0' + mymonth
        }
        if (myweekday < 10) {
          myweekday = '0' + myweekday
        }
        return (myyear + '-' + mymonth + '-' + myweekday)
      }
    }
    return dateUtil
  }
`)

    function getdateUtilInstance() {
      var now = new Date() // 当前日期
      var nowDayOfWeek = now.getDay() // 今天本周的第几天
      var nowDay = now.getDate() // 当前日
      var nowMonth = now.getMonth() // 当前月
      var nowYear = now.getYear() // 当前年
      nowYear += (nowYear < 2000) ? 1900 : 0
      const dateUtil = {
        /**
     * 获得当前日期
     *
     * @returns
     */
        getNowDay() {
          return this.formatDate(new Date())
        },
        /**
     * 获得本周的开始时间
     *
     * @returns
     */
        getStartDayOfWeek() {
          var day = nowDayOfWeek || 7
          return this.formatDate(new Date(now.getFullYear(), nowMonth, nowDay + 1 - day))
        },
        /**
     * 获得本周的结束时间
     *
     * @returns
     */
        getEndDayOfWeek() {
          var day = nowDayOfWeek || 7
          return this.formatDate(new Date(now.getFullYear(), nowMonth, nowDay + 7 - day))
        },
        /**
     * 获得本月的开始时间
     *
     * @returns
     */
        getStartDayOfMonth() {
          var monthStartDate = new Date(nowYear, nowMonth, 1)
          return this.formatDate(monthStartDate)
        },
        /**
     * 获得本月的结束时间
     *
     * @returns
     */
        getEndDayOfMonth() {
          var monthEndDate = new Date(nowYear, nowMonth, this.getMonthDays())
          return this.formatDate(monthEndDate)
        },
        /**
     * 获得本月天数
     *
     * @returns
     */
        getMonthDays() {
          var monthStartDate = new Date(nowYear, nowMonth, 1)
          var monthEndDate = new Date(nowYear, nowMonth + 1, 1)
          var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24)
          return days
        },
        /**
     * @param 日期格式化
     * @returns {String}
     */
        formatDate(date) {
          var myyear = date.getFullYear()
          var mymonth = date.getMonth() + 1
          var myweekday = date.getDate()

          if (mymonth < 10) {
            mymonth = '0' + mymonth
          }
          if (myweekday < 10) {
            myweekday = '0' + myweekday
          }
          return (myyear + '-' + mymonth + '-' + myweekday)
        }
      }
      return dateUtil
    }
    const dateUtil = getdateUtilInstance()
    console.log(dateUtil.getNowDay(), dateUtil.getMonthDays())
    return {
      content, getdateUtilInstance, code
    }
  }
})
</script>
<style lang="scss" scoped>

</style>
