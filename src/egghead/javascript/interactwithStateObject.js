<!DOCTYPE html>
<html>
<body>
  <script src="https://unpkg.com/hyperapp"></script>
  <script>
    const { h, app } = hyperapp

    const state = {
      count: 0
    }

    const actions = {
      decrement: value => state => ({ count: state.count - value }),
      increment: value => state => ({ count: state.count + value })
    }

    const view = (state, actions) =>
      h('div', {}, [
        h('h1', {}, state.count),
        h('button', { onclick: () => { actions.decrement(1) }}, '-'),
        h('button', { onclick: () => { actions.increment(1) }}, '+')
      ])

    window.main = app(
      state,
      actions,
      view,
      document.body
    )
  </script>
</body>
</html>