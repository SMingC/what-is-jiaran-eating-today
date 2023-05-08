/**
 * 该函数根据其权重/概率从数组中随机选择一个元素。
 * @param arr - 一个对象数组，其中每个对象代表一个元素及其权重。这些对象有两个属性：“元素”（元素本身）和“权重”（代表该元素被选中的权重/概率的数字）。
 * @returns 函数 randomMale 返回从输入数组 arr 中随机选择的对象的 element 属性，其中选择每个对象的概率与其 weight 属性成正比。
 */
const randomMale = (arr) => {
  const weightSum = arr.reduce((sum, item) => sum + item.weight, 0);

  // 在 0 到权重总和之间生成一个随机数
  const randomNum = Math.random() * weightSum;

  // 从数组中选择一个元素，使其概率与其权重成正比
  let accumulatedWeight = 0;
  for (let i = 0; i < arr.length; i++) {
    accumulatedWeight += arr[i].weight;
    if (randomNum < accumulatedWeight) {
      return arr[i].element;
    }
  }
};

export default randomMale;