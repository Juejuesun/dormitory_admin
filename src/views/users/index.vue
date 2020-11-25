<template>
  <div>
    <a-table :columns="columns" :data-source="data" bordered>
      <template v-for="col in [ 'userRealname', 'userStudentNumber']" #[col]="{ text, record, index }" :key="col">
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
      <template #ifSilent = "{ record, index }">
        <a-switch v-model:checked="record.ifSilent" :loading="record.isload" @change="onChange(record, index)"/>
      </template>
      <template #operation="{ record }">
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
import { getUserList, updateUserInfo, silent, cancelSilent } from '@/api/table2ns'
import { json } from 'body-parser';
import { message } from 'ant-design-vue'

const columns = [
  {
    title: 'ID',
    dataIndex: 'userId',
    ellipsis: true
  },
  {
    title: '昵称',
    dataIndex: 'userNickname',
    // slots: { customRender: 'userNickname' },
  },
  // {
  //   title: '性别',
  //   dataIndex: 'gender',
  //   width: '15%',
  //   slots: { customRender: 'gender' },
  // },
  {
    title: '真实姓名',
    dataIndex: 'userRealname',
    slots: { customRender: 'userRealname' },
  },
  {
    title: '学号',
    dataIndex: 'userStudentNumber',
    slots: { customRender: 'userStudentNumber' },
  },
  {
    title: '性别',
    dataIndex: 'sex',
  },
  {
    title: '禁言状态',
    dataIndex: 'ifSilent',
    slots: { customRender: 'ifSilent'}
  },
  {
    title: '操作',
    dataIndex: 'operation',
    slots: { customRender: 'operation' },
  },
];

const data = [
  // {
  //   "key": '0',
  //   "ifSilent":0,
  //   "userRealname":"zhagzangsd",
  //   "userStudentNumber":"3472389",
  //   "userNickname":"huhuuh",
  //   "userId":"343423"
  // },
]
export default {
  data() {
    this.cacheData = data.map(item => ({ ...item }));
    return {
      data,
      columns,
      editingKey: ''
    };
  },
  created() {
    this.gettest()
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
    async save(key) {
      const newData = [...this.data];
      const newCacheData = [...this.cacheData];
      const target = newData.filter(item => key === item.key)[0]; //修改后数据
      const targetCache = newCacheData.filter(item => key === item.key)[0];//修改前的数据
      console.log(targetCache)
      let asc = {
        userId: target.userId.toString(),
        userRealName: target.userRealname.toString(),
        userStudentNumber: target.userStudentNumber.toString()
      }
      console.log(asc)
      const { data } = await updateUserInfo(asc)
      console.log(data)
      if(data.status == 'succeed') {
        if (target && targetCache) {
          delete target.editable;
          this.data = newData;
          Object.assign(targetCache, target);
          this.cacheData = newCacheData
          this.editingKey = '';
        }
      } else {
        message.info('请求失败')
      }
      this.editingKey = ''
      this.cancel(key)//无奈出此下策
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
      const { data } = await getUserList()
      console.log(data)
      // this.data = data.searchls
      for(let [ky, val] of data.entries() ) {
        val.key = ky.toString()
        val.ifSilent = Boolean(val.ifSilent)
        val.isload = false
      }
      this.data = data
    },
    async onChange(recoed, index) {
      console.log(recoed, index)
      this.data[index].isload = true
      this.data[index].ifSilent = !this.data[index].ifSilent
      let state = this.data[index].ifSilent
      if(state) {
        const { data } = await silent({userId: this.data[index].userId})
        console.log(data)
        if(data.status == 'wrong') {
          message.info('请求失败')
        }else {
          message.info('操作成功');
        }
      }else {
        const { data } = await cancelSilent({userId: this.data[index].userId})
        console.log(data)
        if(data.status == 'wrong') {
          message.info('请求失败')
        }else {
          message.info('操作成功');
        }
      }
      this.data[index].isload = false
    }
  },
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
