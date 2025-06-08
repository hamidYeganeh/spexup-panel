import ReactQuill from 'react-quill';
// @mui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
//
import EditorToolbar, { formats, imageHandler, redoChange, undoChange } from './EditorToolbar';
import { useCallback, useMemo, useRef } from 'react';
import { MEDIA_USAGE } from 'src/constants/media-usage';
import { getMedia, uploadMedia } from 'src/services/media-api';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`,
  '& .ql-container.ql-snow': {
    borderColor: 'transparent',
    ...theme.typography.body1,
    fontFamily: theme.typography.fontFamily,
  },
  '& .ql-editor': {
    minHeight: 300,
    '&.ql-blank::before': {
      fontStyle: 'normal',
      color: theme.palette.text.disabled,
    },
    '& pre.ql-syntax': {
      ...theme.typography.body2,
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.grey[900],
    },
  },
}));

// ----------------------------------------------------------------------

export default function Editor({
  id = 'minimal-quill',
  error,
  value,
  onChange,
  simple = false,
  helperText,
  sx,
  mediaUsage = MEDIA_USAGE.blogImage,
  ...other
}) {
  const quillRef = useRef(null);

  const imageHandler = useCallback(() => {
    {
      const input = document.createElement('input');

      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();
      input.onchange = async () => {
        const file = input && input.files ? input.files[0] : null;
        const formData = new FormData();
        formData.append('useCase', mediaUsage);
        formData.append('image', file);
        const quillObj = quillRef?.current?.getEditor();

        uploadMedia(formData, MEDIA_USAGE.blogImage)
          .then((res) => {
            const data = getMedia(res?.media?.hash);
            const range = quillObj.getSelection();
            quillObj.insertEmbed(range?.index, 'image', data);
          })
          .catch((err) => {
            console.log('This is an error message', err);
            return false;
          });
      };
    }
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: `#${id}`,
        handlers: {
          undo: undoChange,
          redo: redoChange,
          image: imageHandler,
        },
      },
      history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
      },
      syntax: false,
      clipboard: {
        matchVisual: false,
      },
    }),
    [imageHandler, redoChange, undoChange]
  );

  return (
    <div>
      <RootStyle
        sx={{
          ...(error && {
            border: (theme) => `solid 1px ${theme.palette.error.main}`,
          }),
          ...sx,
        }}
      >
        <EditorToolbar id={id} isSimple={simple} />
        <ReactQuill
          ref={quillRef}
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder="Write something awesome..."
          {...other}
        />
      </RootStyle>

      {helperText && helperText}
    </div>
  );
}
