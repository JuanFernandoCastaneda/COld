import * as React from 'react'
import { Input, Typography } from '@mui/material'
import Markdown from '../markdown'
import { Switch, Button, ButtonGroup } from '@mui/material';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import FormControlLabel from '@mui/material/FormControlLabel';

import { IPreferencesContext } from "../infoview/context"

interface PreferencesPopupProps extends Omit<IPreferencesContext, 'mobile'> {
    handleClose: () => void
}

export function PreferencesPopup({ layout, setLayout, isSavePreferences, setIsSavePreferences, handleClose }: PreferencesPopupProps) {

    const marks = [
        {
            value: 0,
            label: 'Mobile',
            key: "mobile"
        },
        {
            value: 1,
            label: 'Auto',
            key: "auto"
        },
        {
            value: 2,
            label: 'Desktop',
            key: "desktop"
        },
    ];

    const handlerChangeLayout = (_: Event, value: number) => {
        setLayout(marks[value].key as IPreferencesContext["layout"])
    }

    return <div className="modal-wrapper">
        <div className="modal-backdrop" onClick={handleClose} />
        <div className="modal">
            <div className="codicon codicon-close modal-close" onClick={handleClose}></div>
            <Typography variant="body1" component="div" className="settings">
                <div className='preferences-category'>
                    <div className='category-title'>
                        <h3>Layout</h3>
                    </div>
                    <div className='preferences-item first leave-left-gap'>
                        <FormControlLabel
                            control={
                                <Box sx={{ width: 300 }}>
                                    <Slider
                                        aria-label="Always visible"
                                        value={marks.find(item => item.key === layout).value}
                                        step={1}
                                        marks={marks}
                                        max={2}
                                        sx={{
                                            '& .MuiSlider-track': { display: 'none', },
                                        }}
                                        onChange={handlerChangeLayout}
                                    />
                                </Box>
                            }
                            label=""
                        />
                    </div>
                </div>

                <div className='preferences-category tail-category'>
                    <div className='preferences-item'>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={isSavePreferences}
                                    onChange={() => setIsSavePreferences(!isSavePreferences)}
                                    name="checked"
                                    color="primary"
                                />
                            }
                            label="Save my settings (in the browser store)"
                            labelPlacement="end"
                        />
                    </div>
                </div>
            </Typography>
        </div>
    </div>
}
