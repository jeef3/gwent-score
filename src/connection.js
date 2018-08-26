const { hostname } = window.location;

const ws = new WebSocket(`ws://${hostname}:3001`);

export default ws;
