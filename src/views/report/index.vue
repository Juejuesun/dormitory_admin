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
      <template #action="{ record }">
        <a-button :loading="isloading" type="link" style="color: red;" @click="deletepost(record)">
          删帖
        </a-button>
        <a @click="canselrep(record)">取消举报</a>
      </template>
    </a-table>
    <a-button type="primary" @click="gettest()">test</a-button>
  </div>
</template>
<script>
import { getAllReported, deletePost, reportedCancel } from '@/api/table2ns'
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
import { format } from '@/utils/datechange.js'
import { message } from 'ant-design-vue'

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

export default {
  components: {
    SmileOutlined,
    DownOutlined,
  },
  data() {
    return {
      columns,
      list: [
        // {
        //   "key": "0",
        //   "treeId": "64136",
        //   "conText": "起改为头需满需再以道清别问子节管。",
        //   "rpotNum": 43,
        //   "type": ["色情低俗 49", "政治敏感 49", "违法 17", "广告 50", "病毒木马 42", "其他 29"]
        // }
      ],
      isloading: false
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
        let date = format(val.publishTime)
        listCon.push({
          key: ky.toString(),
          treeId: val.postIdOfReport,
          conText: val.postContent,
          rpotNum: val.reportTimes,
          publishTime: date,
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
    },
    async deletepost(record) {
      this.isloading = true
      console.log(record)
      const { data } = await deletePost({
        postId: record.treeId
      })
      console.log(data)
      if(data.status == 'wrong') {
        message.info('请求失败')
      }
      this.gettest()
      this.isloading = false
    },
    async canselrep(record) {
      console.log(record)
      const { data } = await reportedCancel({
        postId: record.treeId
      })
      console.log(data)
      if(data.status == 'wrong') {
        message.info('请求失败')
      }
      this.gettest()
    }
  }
};
</script>
