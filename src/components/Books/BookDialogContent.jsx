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
    handleNewBookAuthorSelect, 
    authors, 
    handleNewBookPublisherSelect,
    publishers,
    selectedCategories,
    handleNewBookCategorySelect,
    categories
  }
) {
  const theme = useTheme()

  return (
    <DialogContent id='content'>
    
      <TextField
        autoFocus
        required
        label="Name"
        name="name"
        value={bookObject.name}
        size="small"
        onChange={inputChangeFunction}
        autoComplete='false'
      />
      <TextField
        required
        label="Publication Year"
        name="publicationYear"
        value={bookObject.publicationYear}
        size="small"
        onChange={inputChangeFunction}
        autoComplete='false'
      />
      <TextField
        required
        label="Stock"
        name="stock"
        value={bookObject.stock}
        size="small"
        onChange={inputChangeFunction}
        autoComplete='false'
      />
      <FormControl sx={{ minWidth: 120 }} size="small">
        <InputLabel id="author-select-label">Author</InputLabel>
        <Select
          labelId="author-select-label"
          value={bookObject.author?.name}
          label="Author"
          name="author"
          onChange={handleNewBookAuthorSelect}
        >
          {authors?.map((author, index) => (
            <MenuItem 
              key={`${index}author`} 
              value={author.id}
            >
              {author.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120 }} size="small">
        <InputLabel id="publisher-select-label">Publisher</InputLabel>
        <Select
          labelId="publisher-select-label"
          value={bookObject.publisher.name}
          label="Publisher"
          name="publisher"
          onChange={handleNewBookPublisherSelect}
        >
          {publishers?.map((publisher, index) => (
            <MenuItem
              key={`${index}publisher`}
              value={publisher.id}
            >
              {publisher.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ width: 300}} size="small">
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          multiple
          name="categories"
          value={selectedCategories}
          onChange={handleNewBookCategorySelect}
          input={<OutlinedInput label="Category"/>}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => {
                const category = categories.find((cat) => cat.id === value);
                return <Chip key={value} label={category ? category.name : ''} /> 
              })}
            </Box>
          )}
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