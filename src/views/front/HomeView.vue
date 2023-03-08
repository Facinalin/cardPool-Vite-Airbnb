<template>
<div class="banner bg-maingray text-white d-flex flex-column justify-content-center">
    <div class="banner-txt">
    <img src="../../assets/banner-txt.svg" alt="" class="mb-5">
    <img src="../../assets/banner-aux-txt.svg" alt="">
  </div>
  <div class="btn-area">
    <button type="button" class="product-btn btn btn-primary text-white border-primary rounded-xxl py-1 px-3 fs-5"><RouterLink to="/products">選擇你的本命！</RouterLink></button>
  </div>
</div>
<div class="container">
      <div class="backlog-section">
        <h1>Backlog</h1>
        <div class="droppable-container"></div>
      </div>

      <div class="sprint-section">
        <h1>Sprint</h1>
        <div class="droppable-container"></div>
      </div>
    </div>
</template>

<script>

import { RouterLink } from 'vue-router'
import Sortable from 'sortablejs'

export default {
  components: {
    RouterLink
  },
  mounted () {
    // 以下為draggable js
    let totalScore = 0
    const totalScoreDOMq = document.querySelector('.total-score')
    totalScoreDOMq.textContent = totalScore
    const backlogDOM = document.querySelector(
      '.backlog-section .droppable-container'
    )
    const sprintDOM = document.querySelector(
      '.sprint-section .droppable-container'
    )

    const backlogArr = [
      { content: '<img src="https://staticg.sportskeeda.com/editor/2022/07/899d5-16580537582949-1920.jpg" alt="" / class="dragPerPic">', score: 5 },
      { content: '<img src="https://staticg.sportskeeda.com/editor/2022/07/899d5-16580537582949-1920.jpg" alt="" / class="dragPerPic">', score: 13 },
      { content: '<img src="https://staticg.sportskeeda.com/editor/2022/07/899d5-16580537582949-1920.jpg" alt="" / class="dragPerPic">', score: 8 },
      { content: '<img src="https://staticg.sportskeeda.com/editor/2022/07/899d5-16580537582949-1920.jpg" alt="" / class="dragPerPic">', score: 8 }
    ]
    console.log(backlogDOM, sprintDOM, backlogArr)

    // 以map方式創造DOM node, 並塞入backlog的container
    backlogArr.map((ele) => {
      const draggableCard = document.createElement('div')
      draggableCard.setAttribute('data-score', ele.score)
      draggableCard.setAttribute('draggable', 'true')
      draggableCard.classList.add('draggble')
      draggableCard.innerHTML = ele.content

      const timeAvatar = document.createElement('div')
      timeAvatar.classList.add('time-avatar')
      timeAvatar.textContent = ele.score

      draggableCard.appendChild(timeAvatar)

      backlogDOM.appendChild(draggableCard)
      return draggableCard
    })

    const sprintSortableObj = Sortable.create(sprintDOM, {
      group: 'dnd',
      animation: 10,
      dataIdAttr: 'data-score',

      onEnd: (event) => {
        // 更新t// 更新totalSccore
        totalScore = sprintSortableObj
          .toArray()
          .map((ele) => parseInt(ele, 10))
          .reduce((a, b) => a + b, 0)
        // // totalScoreDOM.textContent = totalScore

        // const warningTextDOM = document.querySelector('.warning-text')

        // warningTextDOM.classList.add('hidden')
        // if (totalScore > 20) {
        //   warningTextDOM.classList.remove('hidden')
        // }
      }
    })

    const backlogSortableObj = Sortable.create(backlogDOM, {
      group: 'dnd',
      animation: 10,
      dataIdAttr: 'data-score'
    })

    console.log(backlogSortableObj)
  }

}
</script>

<style scoped>
.banner{
  height: 130vh;
  padding: 0 90px;
}

.banner-txt{
  max-width: 100%;
}

.banner-ch-txt{
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 60px;
}
.btn-area{
  max-width: 100%;
  margin-top: 36px;
}
</style>
