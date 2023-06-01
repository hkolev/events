import { useState, useEffect } from 'react';
import { FormControl, FormHelperText, Box, Button } from '@mui/material';
import {
  useController,
  FieldValues,
  FieldPath,
  Control,
} from 'react-hook-form';

interface IControlImageUploadInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  control: Control<TFieldValues>;
}

export const ImageUploadInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
}: IControlImageUploadInput<TFieldValues, TName>) => {
  const [selectedImage, setSelectedImage] = useState<
    Blob | MediaSource | null
  >();

  const { field, fieldState } = useController({
    name,
    control,
  });

  const [imageUrl, setImageUrl] = useState<string | null>(field.value);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const removeImage = () => {
    setSelectedImage(null);
    setImageUrl(null);
    field.onChange('');
  };

  return (
    <>
      <FormControl>
        <input
          accept="image/*"
          type="file"
          id="input"
          style={{ display: 'none' }}
          onChange={(e) => {
            if (!e.target.files?.length) return;
            const file = e.target.files[0];

            setSelectedImage(file);
            field.onChange(URL.createObjectURL(file));
          }}
        />
        <label htmlFor="input">
          <Button variant="contained" color="primary" component="span">
            Upload Image
          </Button>
        </label>

        <FormHelperText error={!!fieldState.error}>
          {!!fieldState.error && fieldState.error.message}
        </FormHelperText>
      </FormControl>

      {imageUrl && selectedImage && field.value && (
        <Box
          sx={{
            width: '500px',
            height: '500px',
          }}
        >
          <Button onClick={removeImage}>Remove</Button>
          <img src={imageUrl} />
        </Box>
      )}
    </>
  );
};
