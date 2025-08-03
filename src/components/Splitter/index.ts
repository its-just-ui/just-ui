/**
 * Splitter Component
 *
 * A flexible splitter component that allows users to resize panes by dragging handles.
 * Supports both horizontal and vertical layouts with extensive customization options.
 *
 * @example
 * ```tsx
 * import { Splitter } from '@/components'
 *
 * <Splitter direction="horizontal" initialSizes={[30, 70]}>
 *   <Splitter.Pane index={0}>
 *     <div>Left Panel</div>
 *   </Splitter.Pane>
 *   <Splitter.Handle index={0} />
 *   <Splitter.Pane index={1}>
 *     <div>Right Panel</div>
 *   </Splitter.Pane>
 * </Splitter>
 * ```
 */

export { Splitter } from './Splitter'
export type {
  SplitterProps,
  SplitterPaneProps,
  SplitterHandleProps,
  SplitterDirection,
  SplitterSize,
  SplitterVariant,
  SplitterBaseProps,
  SplitterContextValue,
} from './Splitter'
