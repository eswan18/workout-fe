export type SaveStatus = 'unsaved' | 'saving' | 'saved';

export default function SaveStatusIndicator({saveStatus}: {saveStatus: SaveStatus}) {
  switch (saveStatus) {
    case "unsaved":
      return <i className="fi fi-br-circle" />
    case "saving":
      return <i className="fi fi-br-rotate-right animate-spin" />
    case "saved":
      return <i className='fi fi-br-check-circle' />
  }
}