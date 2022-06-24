/**
 * setup
 * 有搜索条件的异步请求
 */
import { computed, watch } from 'vue';
import { useRequest } from 'vue-request';
// import { getApplications } from '@/api/portal/resources'

export default function useAsyncData({
  // 异步请求
  request,
  // 搜索条件
  filterData = {},
}) {
  const getData = () => {
    run({
      ...filterData.value,
    });
  };
  const { data, run, loading } = useRequest(request, {
    manual: true, //手动触发请求
    debounceInterval: 300,
  });
  // 搜索条件变化
  watch(
    () => filterData,
    () => {
      getData();
    },
    {
      immediate: true,
      deep: true,
    },
  );
  // 返回列表
  const listData = computed(() => data.value || []);
  return {
    getData,
    listData,
    loading,
  };
}
