<template>
  <div>
    <a-table :columns="columns" :data-source="data" bordered>
      <template v-for="col in ['name', 'gender', 'num']" #[col]="{ text, record, index }" :key="col">
        <div :key="index">  
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template #operation="{ text, record, index }">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="save(record.key)">保存</a>
            <a-popconfirm title="确认放弃修改吗?" @confirm="cancel(record.key)">
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a v-bind="editingKey !== '' ? { disabled: 'disabled' } : {}" @click="edit(record.key)">
              编辑
            </a>
          </span>
        </div>
      </template>
    </a-table>
    <a-button type="primary" @click="gettest()">test</a-button>
  </div>
</template>
<script>
import { getList2ns } from '@/api/table2ns'
import { json } from 'body-parser';
const columns = [
  {
    title: '昵称',
    dataIndex: 'name',
    width: '25%',
    slots: { customRender: 'name' },
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: '15%',
    slots: { customRender: 'gender' },
  },
  {
    title: '学号',
    dataIndex: 'num',
    width: '40%',
    slots: { customRender: 'num' },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    slots: { customRender: 'operation' },
  },
];

const data = [];
for (let i = 0; i < 20; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    gender: '女',
    num: `Student no. ${i}`,
  });
}
export default {
  data() {
    this.cacheData = data.map(item => ({ ...item }));
    return {
      data,
      columns,
      editingKey: '',
    };
  },
  methods: {
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      const newData = [...this.data];
      const newCacheData = [...this.cacheData];
      const target = newData.filter(item => key === item.key)[0];
      const targetCache = newCacheData.filter(item => key === item.key)[0];
      if (target && targetCache) {
        delete target.editable;
        this.data = newData;
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.editingKey = '';
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      this.editingKey = '';
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
        delete target.editable;
        this.data = newData;
      }
    },
    async gettest() {
      const { data } = await getList2ns()
      console.log(data)
      this.data = data.searchls
      // this.data = JSON.stringify(JSON.parse(data.searchls))
    }
  },
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
