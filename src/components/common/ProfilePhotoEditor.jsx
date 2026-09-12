import Avatar from "./Avatar";
import ProfilePictureSelection from "./ProfilePictureSelection/ProfilePictureSelection";

export default function ProfilePhotoEditor({ user, editing, saving, file, remove, onFile, onRemove }) {
  if (!editing) return <div className="h-20 w-20 shrink-0 rounded-full bg-black text-2xl font-semibold text-white"><Avatar user={user} /></div>;
  return <fieldset disabled={saving} className="shrink-0 disabled:opacity-60">
    <ProfilePictureSelection file={file} setFile={(value) => { onFile(value); if (value) onRemove(false); }} existingUrl={remove ? null : user?.profilePicture?.url} />
    {user?.profilePicture?.url && <button type="button" onClick={() => { onFile(null); onRemove(!remove); }} className="mt-3 text-sm text-gray-500 underline">
      {remove ? "Undo photo removal" : "Remove photo"}
    </button>}
    <p className="mt-2 text-xs text-gray-400">Photo changes apply when you save.</p>
  </fieldset>;
}
