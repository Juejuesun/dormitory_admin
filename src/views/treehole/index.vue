<template>
  <div>
    <a-alert message="树洞" type="info"/>

    <a-table :columns="columns" :data-source="posts">
      <!-- <template #action="{ text }">
        <a>Delete</a>
      </template> -->
      <template #expandedRowRender="{ record }">
        <p style="margin: 0">
          {{ record.postContent }}
        </p>
      </template>
    </a-table>

    <a-button type="primary" @click="getlists">test</a-button>
  </div>
</template>
<script>
import { getAllPosts } from '@/api/table2ns'

const columns = [
  { title: 'ID', dataIndex: 'postId', key: 'postId', ellipsis: true },
  { title: '发布时间', dataIndex: 'publishTime', key: 'publishTime' }
];

export default {
  data() {
    return {
      columns,
      posts: [
        // {
        //   key: 0,
        //   postContent:'哈哈哈哈哈哈哈哈哈哈',
        //   postId:6364,
        //   publishTime: '2020-11-25 16:14:08'
        // }
      ]
    };
  },
  created() {
    this.getlists()
  },
  methods: {
    async getlists() {
      let { data } = await getAllPosts()
      console.log(data)
      if(data.status == 'succeed') {
        for(let [ky, val] of data.posts.entries()) {
          val.key = ky.toString()
        }
        this.posts = data.posts
      }
    }
  }
};
</script>
