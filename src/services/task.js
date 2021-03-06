import { stringify } from 'qs';
import request from '../utils/request';

export async function queryApproverTasks(params) {
  return request(`/api/v2/task/list/approver?${stringify(params)}`);
}

export async function queryTask(params) {
  return request(`/api/task?${stringify(params)}`);
}

export async function queryTaskOperationRecords(params) {
  return request(`/api/task/operationRecords?${stringify(params)}`);
}

export async function addTask(params) {
  return request('/api/v2/task', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function addTaskByWriter(params) {
  return request('/api/task', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function publishTask(params) {
  return request('/api/task/publish', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function updateTask(params) {
  return request('/api/task/update', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function takeTask(params) {
  return request('/api/task/take', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function handinTask(params) {
  return request('/api/task/handin', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function approveTask(params) {
  return request('/api/v2/task/approve', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function specifyTask(params) {
  return request('/api/task/specify', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function withdrawTask(params) {
  return request('/api/task/withdraw', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function passTask(params) {
  return request('/api/task/pass', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function removeTask(params) {
  return request('/api/task', {
    method: 'DELETE',
    body: {
      ...params,
    },
  });
}

export async function payoffTask(params) {
  return request('/api/task/payoff', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function undarenTask(params) {
  return request('/api/task/undaren', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function queryProjectTasks(params) {
  return request(`/api/task/list/project?${stringify(params)}`);
}

export async function queryTakerTasks(params) {
  return request(`/api/task/list/taker?${stringify(params)}`);
}

export async function queryTeamTasks(params) {
  return request(`/api/task/list/team?${stringify(params)}`);
}

export async function queryProjectFinanceTasks(params) {
  return request(`/api/task/list/project/finance?${stringify(params)}`);
}

export async function queryYhhBody(params) {
  return request(`/api/task/yhh/body?${stringify(params)}`);
}

export async function queryAuctionOrders(params) {
  return request(`/api/alimama/orders/by/auctionIds?${stringify(params)}`);
}

export async function queryTaskRender(params) {
  console.log(params)
  return request(`/api/task/render.json?${stringify(params)}`);
}

export async function approveTaskBatch(params) {
  return request('/api/task/approve/batch', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function queryNeedSyncTasks(params) {
  return request(`/api/task/need_sync/list?${stringify(params)}`);
}

export async function taskTaobaoStatus(params) {
  return request('/api/task/taobao/status', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function taskTaobaoSummary(params) {
  return request('/api/task/taobao/summary', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function queryPublisherTasks(params) {
  return request(`/api/task/list/publisher?${stringify(params)}`);
}

export async function darenTasks(params) {
  return request('/api/task/daren/tasks', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}
