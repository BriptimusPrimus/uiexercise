~~git init~~\
~~render grid with videos~~\
~~render all markup~~\
~~break render into components~~\
~~design state schema~~\
~~design pagination~~\
~~build pagination~~\
improve pagination (lru)\
~~fade in when in view port~~\
~~clean up~~\
research\
progressive image loading\
state-ui-lib\
lint\
format\
unit tests




PAGE_SIZE: 6,

MAX_LOADED_PAGES: 3

ROW_HEIGHT = 166

window.innerHeight = 943

(calc) PAGE_SIZE = Math.ceil(window.innerHeight / ROW_HEIGHT)

PAGE_HEIGHT = PAGE_SIZE * ROW_HEIGHT; // 996



