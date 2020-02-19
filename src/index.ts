import xs, { Stream } from 'xstream';
import { run } from '@cycle/run';
import { div, input, h2, button, p, makeDOMDriver, VNode, DOMSource, MainDOMSource } from '@cycle/dom';

interface Sources {
  DOM: MainDOMSource;
}

interface Sinks {
  DOM: Stream<VNode>;
}

function main(source: Sources): Sinks {
  const name$ = source.DOM
    .select('.name')
    .events('input')
    .map(ev => (ev.target as HTMLInputElement).value)
    .startWith('');

  const vdom$ = name$.map(name =>
    div([
      p([
        'Your name',
        input('.name', { attrs: { type: 'text' } }),
      ]),
      h2('Hello ' + name),
    ]),
  );

  return {
    DOM: vdom$,
  };
}

run(main, {
  DOM: makeDOMDriver('#main-container'),
});