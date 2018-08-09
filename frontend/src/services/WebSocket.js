import config from '../config';

class WebSocketService {
  static instance = null;
  callbacks = {};

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  constructor() {
    this.socketRef = null;
  }

  connect() {
    const path = config.API_PATH;
    this.socketRef = new WebSocket(path);
    this.socketRef.onopen = () => {
      console.log('WebSocket open');
    };
    this.socketRef.onmessage = e => {
      this.socketNewMessage(e.data);
    };

    this.socketRef.onerror = e => {
      console.log(e.message);
    };
    this.socketRef.onclose = () => {
      console.log("WebSocket closed let's reopen");
      this.connect();
    };
  }

  // When front end receives command, parse data and find callback
  socketNewMessage(data) {
    const parsedData = JSON.parse(data);
    const command = parsedData.command;
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    if (command === 'add_player' ) {
      this.callbacks[command](parsedData.players);
    }
    if (command === 'fetch_players' ) {
      this.callbacks[command](parsedData.players);
    }
    if (command === 'new_solution') {
      this.callbacks[command](parsedData.solution);
    }
    if (command === 'new_problem') {
      this.callbacks[command](parsedData.problem, parsedData.alan);
    }
  }

  // Send commands to back end
  addPlayer(username) {
    this.sendMessage({command: 'add_player', username: username});
  }
  fetchPlayers() {
    this.sendMessage({ command: 'fetch_players'});
  }
  getNewProblem() {
    this.sendMessage({ command: 'new_problem'});
  }
  sendNewSolution(solution, username, problem) {
    this.sendMessage({command: 'new_solution', solution: solution, username: username, problem: problem});
  }

  // Add callbacks for when commands are received from back end
  addCallbacks(callbacks) {
    for (const [key, value] of Object.entries(callbacks)) {
      this.callbacks[key] = value;
    };
  }
  
  sendMessage(data) {
    try {
      this.socketRef.send(JSON.stringify({ ...data }));
    }
    catch(err) {
      console.log(err.message);
    }  
  }

  state() {
    return this.socketRef.readyState;
  }

   waitForSocketConnection(callback){
    const socket = this.socketRef;
    const recursion = this.waitForSocketConnection;
    setTimeout(
      function () {
        if (socket.readyState === 1) {
          console.log("Connection is made")
          if(callback != null){
            callback();
          }
          return;

        } else {
          console.log("wait for connection...")
          recursion(callback);
        }
      }, 1); // wait 5 milisecond for the connection...
  }

}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;
