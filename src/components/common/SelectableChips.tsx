'use client';

import { Box, Chip } from '@mui/material';

interface SelectableChipsProps {
  label: string;
  options: string[];
  selected: string | null;
  isDisabled: boolean;
  onSelectAction: (value: string) => void;
}

export default function SelectableChips({ label, options, selected, isDisabled, onSelectAction }: SelectableChipsProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <strong>{label}</strong>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {options.map((option) => (
          <Chip
            key={option}
            label={option}
            color={selected === option ? 'primary' : 'default'}
            onClick={() => onSelectAction(option)}
            disabled={isDisabled}
            sx={{
              cursor: 'pointer',
              backgroundColor: selected === option ? 'primary.main' : 'grey.300',
              color: selected === option ? 'white' : 'black',
              fontWeight: selected === option ? 'bold' : 'normal',
              '&:hover': {
                backgroundColor: selected === option ? 'primary.main' : 'grey.400'
              }
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
