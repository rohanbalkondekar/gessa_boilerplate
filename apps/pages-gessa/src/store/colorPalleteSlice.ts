import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  EntityState,
} from '@reduxjs/toolkit';
import { IRootState } from './index';
import axios from 'axios';


type _IRThemePalette = EntityState<IRThemePalette>;
export interface IRThemePaletteContext extends _IRThemePalette {
  activeProjectId: string;
}

export interface IRThemePalette {
  project_id: string;
  color: any;
}

export const getThemePalette = createAsyncThunk(
  'projects',
  async (params: any, { dispatch }: any) => {
       const response: any = await axios.get(
      `http://gessa.io/gessa-project/colors/${params}`
    );
      const themeObject: IRThemePalette = { project_id: params, color: {} };
    // dispatch(setThemeContext(themeObject))
    return response;
  }
);

const themePaletteAdapter = createEntityAdapter<IRThemePalette>({
  selectId: ({ project_id }) => project_id,
});

export const { selectAll: selectThemePaletteContext } =
  themePaletteAdapter.getSelectors(
    (state: IRootState) => state.grid.themePaletteSlice
  );


const themePaletteSlice = createSlice({
  name: 'projects',
  initialState: themePaletteAdapter.getInitialState({
    themePaletteContext: null,
  }),
  reducers: {
    setThemePaletteContext: themePaletteAdapter.setOne,
  },
});

export const { setThemePaletteContext } = themePaletteSlice.actions;
export default themePaletteSlice.reducer;
