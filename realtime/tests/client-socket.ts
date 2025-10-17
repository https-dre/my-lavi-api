function parseJsonToBuffer(data: object): Buffer {
  const jsonString = JSON.stringify(data);
  const buffer = Buffer.from(jsonString);
  return buffer;
}

const socket = new WebSocket('ws://localhost:3000/ws');

// Define que vamos receber dados como ArrayBuffer
socket.binaryType = 'arraybuffer';

socket.onopen = () => {
  setInterval(() => {
    socket.send(parseJsonToBuffer({ event: "message", body: { message: "Hello Server!"}}))
  }, 1000);
};

socket.onmessage = (event) => {
  // event.data é um ArrayBuffer (dados binários)
  const arrayBuffer = event.data;

  // Converta o ArrayBuffer para string
  const decoder = new TextDecoder('utf-8');
  const jsonString = decoder.decode(arrayBuffer);

  // Parse JSON para objeto
  const obj = JSON.parse(jsonString);

  console.log('Recebido do servidor:', obj);
};

socket.onopen = () => {
  setInterval(() => {
    socket.send(parseJsonToBuffer({ event: "message", body: { message: "HHHH"}}))
  },10000)
}


