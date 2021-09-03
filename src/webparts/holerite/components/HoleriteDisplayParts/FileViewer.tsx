import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Button, Typography } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(1),
      height: 500,
    },
    pdf: {
      height: 400,
    },
    button: {
      margin: theme.spacing(1),
    },
  }),
);

interface FileViewerProps {
  file: string;
  payslip_name: string;
}

const FileViewer: React.FC<FileViewerProps> = ({ file, payslip_name }: FileViewerProps) => {
  const classes = useStyles();

  /**
   * Download the file from url sended
   * @param url String
   * @param filename String
   */
  function downloadBlob(url: string, filename: string): void {
    const element = document.createElement("a");
    element.href = url;
    element.target = "_blank";
    element.setAttribute("data-interception", 'off');
    element.download = filename + '.pdf';
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  /**
   * Receive HEX aand convert it to base64
   * @param hexstring
   * @returns base64 string
   */
  const hexToBase64 = (hexstring: string): string => {
    return Buffer.from(hexstring, 'hex').toString('base64');
  };

  /**
   * Receive base64 string and return its blob
   * @param data
   * @returns base64 Blob
   */
  const base64toBlob = (data: string): Blob => {
    const byteCharacters = Buffer.from(data, 'base64').toString('binary');
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const content = new Uint8Array(byteNumbers);

    return new Blob([content], { type: 'application/pdf' });
  };

  const blob: Blob = base64toBlob(hexToBase64(file));
  const url: string = URL.createObjectURL(blob);

  return(
    <Grid container className={classes.root}>
      <Grid item id="pdf-display">
        <object data={`${url}#zoom=80`} type="application/pdf" className={classes.pdf} style={{ width: `${window.innerWidth < 900 ? '80vw' : '40vw'}`}}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<GetAppIcon />}
            onClick={() => downloadBlob(url, payslip_name)}
          >
            <Typography variant="subtitle1" align="center">{`Baixar holerite ${payslip_name}`}</Typography>
          </Button>
        </object>
      </Grid>
    </Grid>
  );
};

export default FileViewer;
