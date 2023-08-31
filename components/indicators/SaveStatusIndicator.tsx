export type SaveStatus = 'unsaved' | 'saving' | 'saved';

export default function SaveStatusIndicator({saveStatus}: {saveStatus: SaveStatus}) {
  switch (saveStatus) {
    case "unsaved":
      return <i className="fa-regular fa-circle" />
    case "saving":
      return <i className="fa-solid fa-spinner animate-spin" />
    case "saved":
      return <i className='fa-regular fa-circle-check' />
  }
}