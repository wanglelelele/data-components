/**
 * setup
 * 有搜索条件,分页的异步请求
 */
import { computed, watch } from 'vue';
import { usePagination } from 'vue-request';

export default function useAsyncDataWithPagination({
  // 异步请求
  request,
  //搜索条件
  filterData = {},
  // 返回列表键值
  listKey = 'rows',
  // 默认分页
  defaultPaginationOpts = { pageSize: 10, pageNumber: 1 },
  // 分页键值
  paginationKeys = {
    currentKey: 'pageNumber',
    pageSizeKey: 'pageSize',
    totalKey: 'total',
  },
  // 依赖请求
  ready,
}) {
  const getData = (data = {}) => {
    return run({
      [paginationKeys.pageSizeKey]: data.pageSize ?? pageSize.value,
      [paginationKeys.currentKey]: data.current ?? current.value,
      ...filterData.value,
    });
  };
  const { data, run, loading, current, pageSize, total } = usePagination(request, {
    manual: true, //手动触发请求
    debounceInterval: 300,
    defaultParams: [defaultPaginationOpts],
    pagination: paginationKeys,
    ready,
  });
  // 搜索条件变化
  watch(
    () => filterData,
    () => getData({ current: 1 }),
    { immediate: true, deep: true },
  );
  // 当前页
  const onCurrentPageChange = (current, pageSize) => {
    getData({ current, pageSize });
  };
  // 页码
  const onPageSizeChange = (current, pageSize) => {
    getData({ current, pageSize });
  };
  // 返回列表
  const listData = computed(() => data.value?.[listKey] || []);
  // 返回页
  const pagination = computed(() => {
    return {
      total: total.value,
      current: current.value,
      pageSize: pageSize.value,
    };
  });
  return {
    pagination,
    listData,
    loading,
    data,
    onCurrentPageChange,
    onPageSizeChange,
    getData,
  };
}
