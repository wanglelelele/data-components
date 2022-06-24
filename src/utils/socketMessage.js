import config from '@/config/app-config';

const msgManager = {
  ws: null,
  userId: null,
  retryTimeout: 10000,
  retryTimeoutObj: null,
  lockReconnect: false,
  initSocket(userId) {
    this.userId = userId;
    this.connect();
  },
  connect() {
    this.disconnect();
    this.ws = new WebSocket(`${config.socketUrl}${this.userId}`);
    this.onopen();
  },
  onopen() {
    if (this.ws) {
      this.ws.onopen = () => {
        console.log('Connection open ...');
        if (this.ws.readyState === this.ws.OPEN) {
          console.log('connected');
        } else {
          this.retry();
        }
      };
      this.ws.onerror = () => {
        console.log('connection socket oneror');
        this.retry();
      };
    }
  },
  onclose() {
    if (this.ws) {
      this.ws.onclose = () => {
        console.log('Connection close ...');
      };
    }
  },
  onmessage(fun) {
    if (this.ws) {
      this.ws.onmessage = (evt) => {
        if (fun) fun(evt);
      };
    }
  },
  send(msg) {
    if (this.ws) {
      this.ws.send(JSON.stringify(msg));
    }
  },
  disconnect() {
    if (this.ws) this.ws.close();
  },
  retry() {
    if (this.lockReconnect) {
      return;
    }
    this.lockReconnect = true;
    if (this.retryTimeoutObj) {
      clearTimeout(this.retryTimeoutObj);
      this.retryTimeoutObj = null;
    }
    this.retryTimeoutObj = setTimeout(() => {
      this.userId && this.initSocket(this.userId);
      this.lockReconnect = false;
    }, this.retryTimeout);
  },
};

export default msgManager;
