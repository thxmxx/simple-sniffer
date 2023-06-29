const { format_timestamp } = require("./ansi.js");
const pcap = require("pcap");
const pcap_session = pcap.createSession("wlp60s0", {
  filter: "ip proto \\tcp",
});

pcap_session.on("packet", function (raw_packet) {
  const packet = pcap.decode.packet(raw_packet);
  const ipv4_packet = packet.payload.payload;
  const tcp_packet = ipv4_packet.payload;
  const ts = format_timestamp(packet.pcap_header.tv_sec * 1000);
  console.log(
    `${ts} TCP: ${ipv4_packet.saddr.addr.join(".")}:${
      tcp_packet.sport
    } -> ${ipv4_packet.daddr.addr.join(".")}:${tcp_packet.dport} Data: ${
      tcp_packet.data
        ? require("string-hex")(tcp_packet.data.toString())
        : "no-data"
    }`
  );
});
