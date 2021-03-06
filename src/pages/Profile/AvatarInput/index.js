import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import { Container } from './styles';
import api from '~/services/api';

export default function AvatarInput() {
  const { defaultValue, registerField } = useField('avatar');
  const [file, setFile] = useState(defaultValue && defaultValue.url);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);
  const ref = useRef();
  useEffect(() => {
    registerField({
      name: 'avatar_id',
      ref: ref.current,
      path: 'dataset.file',
    });
  }, [file]);

  async function handleChange(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);
    const response = await api.post('files', data);
    console.tron.log(response.data);
    const { id, url } = response.data;
    setFile(id);
    setPreview(url);
  }
  return (
    <Container>
      <label htmlFor="avatar">
        <img
          src={
            preview || 'https://api.adorable.io/avatars/49/abott@adorable.png'
          }
          alt="Avatar"
        />
        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}
