<template>
  <div>
    <a-table :columns="columns" :data-source="list">
      <template #treeID="{ text }">
        <a>{{ text }}</a>
      </template>
      <template #tags="{ text: type }">
        <span>
          <a-tag
            v-for="tag in type"
            :key="tag"
            :color="tag === '色情低俗 49' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
          >
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template #action>
        <a>通过</a>
      </template>
    </a-table>
    <a-button type="primary" @click="gettest()">test</a-button>
  </div>
</template>
<script>
import { getAllReported } from '@/api/table2ns'
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
const columns = [
  {
    title: "ID",
    dataIndex: 'treeId',
    key: 'treeId',
    ellipsis: true,
    slots: { customRender: 'treeID' },
  },
  {
    title: '举报数',
    dataIndex: 'rpotNum',
    key: 'rpotNum',
  },
  {
    title: '内容',
    dataIndex: 'conText',
    key: 'conText',
  },
  {
    title: '类型',
    key: 'type',
    dataIndex: 'type',
    slots: { customRender: 'tags' },
  },
  {
    title: '发布时间',
    dataIndex: 'publishTime',
    key: 'publishTime',
  },
  {
    title: '操作',
    key: 'action',
    slots: { customRender: 'action' },
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export default {
  components: {
    SmileOutlined,
    DownOutlined,
  },
  data() {
    return {
      data,
      columns,
      list: [{
            "key": "0",
            "treeId": "64136",
            "conText": "起改为头需满需再以道清别问子节管。",
            "rpotNum": 43,
            "type": ["色情低俗 49", "政治敏感 49", "违法 17", "广告 50", "病毒木马 42", "其他 29"]
        }]
    }
  },
  created() {
    this.gettest()
  },
  methods: {
    changedata(replist) { //封装列表
      let listCon = []
      let tycon = {
        vulgar: '色情低俗',
        sensitivity: '政治敏感',
        illegal: '违法',
        advertisement: '广告',
        virus: '病毒木马',
        others: '其他'
      }
      for(let [ky, val] of replist.entries()) {
        let types = []
        let vt = val.type
        for(let kyi in vt) {  //对type进行封装
          if(vt[kyi]) {
            types.push(tycon[kyi]+' '+vt[kyi].toString())
          }
        }
        console.log(types)
        listCon.push({
          key: ky.toString(),
          treeId: val.postIdOfReport,
          conText: val.postContent,
          rpotNum: val.reportTimes,
          publishTime: val.publishTime,
          type: types
        })
      }
      console.log(listCon)
      this.list = listCon
    },
    async gettest() {
      const { data } = await getAllReported()
      console.log(data)
      if(data.status == "succeed") {
        this.changedata(data.posts)
      }
    }
  }
};
</script>
