function pubsubFactory() {
  const topics = {};

  function publish(topic, arg) {
    let len;

    if (!topics[topic]) {
      return;
    }

    const subscribers = topics[topic];
    len = subscribers ? subscribers.length : 0;

    while (len > 0) {
      subscribers[len - 1].func(arg);
      len -= 1;
    }
  }

  function subscribe(topic, func) {
    if (typeof func !== 'function') {
      return;
    }

    if (!topics[topic]) {
      topics[topic] = [];
    }

    topics[topic].push({
      func
    });
  }

  return {
    publish,
    subscribe
  };
}

export default pubsubFactory;
