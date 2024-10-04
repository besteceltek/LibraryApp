import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import { useTheme } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};  

function getStyles(categoryName, selectedCategories, theme) {
  return {
    fontWeight: selectedCategories.includes(categoryName)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

function BookDialogContent(
  { 
    bookObject, 
    inputChangeFunction, 
    handleAuthorSelect, 
    authors, 
    handlePublisherSelect,
    publishers,
    selectedCategories,
    handleCategorySelect,
    categories
  }
) {
  const theme = useTheme()

  return (
    <DialogContent id='content'>
      {Object.keys(bookObject).map((key) => {
        if (key === "name" || key === "publicationYear" || key === "stock") {
          return (
            <TextField
              key={`book-${key}-input`}
              required
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              name={key}
              value={bookObject[key]}
              size="small"
              onChange={inputChangeFunction}
              autoComplete='off'
            />
          )
        } else if (key === "author" || key === "publisher") {
          return (
            <FormControl key={`book-${key}-input`} size="small">
              <InputLabel id={`${key}-select-label`}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </InputLabel>
              <Select
                labelId={`${key}-select-label`}
                value={bookObject[key].id}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                name={key}
                onChange={key === "author" ? handleAuthorSelect : handlePublisherSelect}
              >
                {(key === "author" ? authors : publishers).map((prop, index) => (
                  <MenuItem 
                    key={`book-${key}-menu-item-${index}`} 
                    value={prop.id}
                  >
                    {prop.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )
        }
      })}
      <FormControl sx={{ width: 300}} size="small">
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          multiple
          name="categories"
          value={selectedCategories}
          onChange={handleCategorySelect}
          input={<OutlinedInput label="Category"/>}
          renderValue={(selected) => {
            if (!selected || selected.length === 0) {
              return (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {bookObject.categories?.map((category) => {
                    return <Chip key={`category-${category.id}`} label={category ? category.name : ''} /> 
                  })}
                </Box>
              )
            } else {
              return (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => {
                    const category = categories.find((cat) => cat.id === value);
                    return <Chip key={value} label={category ? category.name : ''} /> 
                  })}
                </Box>
              )
            }
          }}
          MenuProps={MenuProps}
        >
          {categories.map((category, index) => (
            <MenuItem
              key={`${index}category`}
              value={category.id}
              style={getStyles(category.name, selectedCategories, theme)}
            >
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </DialogContent>
  )
}

export default BookDialogContent