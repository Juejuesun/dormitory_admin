<template>
  <div>
    <a-alert message="树洞" type="info"/>

    <a-table :columns="columns" :data-source="data">
    <template #action="{ text }">
      <a>Delete</a>
    </template>
    <template #expandedRowRender="{ record }">
      <p style="margin: 0">
        {{ record.description }}
      </p>
    </template>
  </a-table>
  </div>
</template>
<script>
const columns = [
  { title: 'ID', dataIndex: 'name', key: 'name', ellipsis: true },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  // { title: 'Action', dataIndex: '', key: 'x', slots: { customRender: 'action' } },
];

const data = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
];

export default {
  data() {
    return {
      data,
      columns,
    };
  },
};
</script>
