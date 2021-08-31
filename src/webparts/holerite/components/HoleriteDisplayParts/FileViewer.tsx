import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(1),
      height: 500,
    },
    pdf: {
      width: 600,
      height: 400,
    }
  }),
);

interface FileViewerProps {
  file: string;
}

const FileViewer: React.FC<FileViewerProps> = ({ file }: FileViewerProps) => {
  const classes = useStyles();

  /**
   * Receive HEX aand convert it to base64
   * @param hexstring
   * @returns base64 string
   */
  const hexToBase64 = (hexstring: string): string => {
    return btoa(hexstring.match(/\w{2}/g).map((item) => {
        return String.fromCharCode(parseInt(item, 16));
    }).join(""));
  };

  /**
   * Receive base64 string and return its blob
   * @param data
   * @returns base64 Blob
   */
  const base64toBlob = (data: string): Blob => {
    const byteCharacters: string = atob(data);

    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const content: Uint8Array = new Uint8Array(byteNumbers);

    return new Blob([content], { type: 'application/pdf' });
  };

  const blob: Blob = base64toBlob(hexToBase64(file));
  const url: string = URL.createObjectURL(blob);

  return(
    <div className={classes.root}>
      <Grid container>
        <Grid item>
          <embed src={`${url}#scrollbar=0&toolbar=0&statusbar=0&navpanes=0&zoom=80`} className={classes.pdf}/>
        </Grid>
      </Grid>
    </div>
  );
};

export default FileViewer;
