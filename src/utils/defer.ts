
import { ref, onMounted } from 'vue'
export default function(count = 10) {
  const displayPriority = ref(0)

  onMounted(() => {
    runDisplayPriority()
  })

  const runDisplayPriority = () => {
    const step = () => {
      requestAnimationFrame(() => {
        displayPriority.value++

        if (displayPriority.value < count) {
          step()
        }
      })
    }
    step()
  }

  const defer = (priority) => {
    return displayPriority.value >= priority
  }
  return {
    defer
  }
}
