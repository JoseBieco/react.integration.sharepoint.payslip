import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { HoleriteWebPartProps } from '../HoleriteWebPart';
import { useState } from 'react';
import { Error, Holerite, HoleriteState, HOLERITE_INITIAL_STATE } from './HoleriteProps';
import { Grid, Typography } from '@material-ui/core';
import SearchButton from './SearchButton';
import HoleriteDisplay from './HoleriteDisplay';
import { Api } from '../../../index';
import ErrorDisplay from './HoleriteDisplayParts/ErrorDisplay';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: 200,
    },
    expandedPage: {
      height: 600,
    },
    button: {
      height: 300,
    }
  }),
);

const Holerite: React.FC<HoleriteWebPartProps> = ({context, properties}: HoleriteWebPartProps) => {
  const classes = useStyles();
  const api = new Api(properties.api_user , properties.api_password , properties.api_url);

  const [state, setState] = useState<HoleriteState>(HOLERITE_INITIAL_STATE);
  const [loadPage, setLoadPage] = useState(false);
  const [fail, setFail] = useState(false);
  const [file, setFile] = useState('');
  const [monthCode, setMonthCode] = useState('');
  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  const setPayslipNameFromCode = (data: string): string => {
    let holerite: Holerite = {CODIGO: '', DESCRICAO: '', IPERI: ''};

    for(let i = 0; i < state.holerites.length; i++){
      let item = state.holerites[i];

      if(item.CODIGO === data){
        holerite = item;
        break;
      }
    }
    return `${dataFormat(holerite.IPERI)}.${setDescription(holerite.DESCRICAO)}`;
  };

  /**
   * Receive the user id and validates if the given string has only numbers
   * @param code String
   * @returns Boolean
   */
  const validateUserCode = (code: string): boolean => {
    let regex: RegExp = /[^0-9]/g;

    let validatedCode: string = code.replace(regex, '');

    return !validatedCode || validatedCode.length !== code.length;
  };

  const getValidPayslipList = (holerites: Array<Holerite>): Array<Holerite> => {
    const list: Array<Holerite> = [];
    var monthCount: number = 0;
    var iperi: string = '';

    for(let i = 0; i < holerites.length && monthCount < 13; i++){
      let item = holerites[i];

      // Check if the new item IPERI is the same as the last one. If it's true, monthCount increases in one
      if(item.IPERI !== iperi){
        iperi = item.IPERI;
        monthCount++;
      }

      if(monthCount < 13){
        list.push({CODIGO: item.CODIGO, DESCRICAO: item.DESCRICAO, IPERI: item.IPERI});
      }else {
        break;
      }
    }

    return list;
  };

  /**
   * Load all the Payslip list from the logged user
   */
  const getHoleriteList =  async () => {
    try {
      let user_id = context.pageContext.user.loginName.split('@')[0];

      // If the login do not contain a valid user code, a message will be set in state.error
      if(validateUserCode(user_id)) {
        let newErro: Error = {message: 'Código inválido!'};
        setState({...state, error: [...state.error, newErro]});
        setFail(true);
        return;
      }

      setState({...state, user_id: user_id});

      const response = await api.connection.get(`/ListaHolerite/11111111111/4001/${user_id}`);

      if(response.status === 200) {
        // If the response returns any kind of error
        if(response.data.MT_Holerite_RES.ERP.Mensagem){
          let newErro: Error = {message: response.data.MT_Holerite_RES.ERP.Mensagem};
          setState({...state, error: [...state.error, newErro]});
          setFail(true);
          return;
        }

        // If the user don't have any payslip, set a message and not load the Search Button component
        if(!response.data.MT_Holerite_RES.ERP.Content){
          let newErro: Error = {message: 'O colaborador não possui nenhum holerite cadastrado!'};
          setState({...state, error: [...state.error, newErro]});
          setFail(true);
          return;
        }

        const list: Holerite[] = [];
        let reversedArray = getValidPayslipList(response.data.MT_Holerite_RES.ERP.Content.reverse());

        for(let i = 0; i < reversedArray.length; i++){
          let item = reversedArray[i];
          list.push({CODIGO: item.CODIGO, DESCRICAO: item.DESCRICAO, IPERI: item.IPERI});
        }

        setState({...state, holerites: list});
      }
    }catch(err) {
      let newErro: Error = {message: 'Ocorreu um erro ao carregar suas informações!'};
      setFail(true);
      setState({user_id: state.user_id, month_code: state.month_code, holerites: state.holerites, isLoading: false, error: [...state.error, newErro]});
    }
  };

  React.useEffect(() => {
    getHoleriteList();
  }, []);

  /**
   * Load the specific payslip
   * @returns
   */
  const getHolerite = async (): Promise<void> => {
    try{
      let user_id = context.pageContext.user.loginName.split('@')[0];
      const response = await api.connection.get(`/Holerite/4001/${monthCode}/${monthCode}/11111111111/${user_id}`);

      if(response.status === 200) {
        if(response.data.MT_Holerite_RES.ERP.Mensagem){
          let newErro: Error = {message: response.data.MT_Holerite_RES.ERP.Mensagem};
          setState({...state, error: [...state.error, newErro]});
          setFail(true);
        }else {
          setName(setPayslipNameFromCode(monthCode));
          setFile(response.data.MT_Holerite_RES.ERP.ContentBin);
          setLoadPage(true);
        }
      }
    }catch(err) {
      let newErro: Error = {message: 'Ocorreu um erro ao tentar exibir o seu holerite!'};
      setState({...state, error: [...state.error, newErro]});
      setFail(true);
    }
  };

  /**
 * Get unformated data (yyyymm) and retuns it on mm/yyyy format
 * @param data String
 * @returns String
 */
  const dataFormat = (data: string): string => {
    return data.toString().slice(4) + '/' + data.toString().slice(0,4);
  };

  /**
   * Get the holerite description and returns it to display
   * @param data String
   * @returns String
   */
  const setDescription = (data: string): string => {
    if(data == '1313') {
      return '13°';
    }
    return data;
  };

  return(
    <div className={`${classes.root} ${(loadPage && !fail) ? classes.expandedPage : ''} ${ !fail ? (loadPage ? classes.expandedPage : classes.button) : ''}`}>
      <Typography variant="body1" align="center" gutterBottom style={{ fontWeight: 'bold', color: '#252627', fontSize: '1.5em' }}>
        Demonstrativo de Pagamento
      </Typography>
      <Grid container spacing={2}>
        {state.error.length !== 0 &&
          <ErrorDisplay errors={state.error} />
        }
        {(!state.error.length) &&
          <SearchButton
          state={state}
          setMonthCode={setMonthCode}
          setPayslipCode={setCode}
          getHolerite={getHolerite}
          setLoadPage={() => setLoadPage(true)} />
        }
        {(loadPage && !fail) &&
          <Grid item xs={12} justifyContent="center">
            <HoleriteDisplay file={file} payslip_name={name}/>
          </Grid>
        }
      </Grid>
    </div>
  );
};
export default Holerite;
