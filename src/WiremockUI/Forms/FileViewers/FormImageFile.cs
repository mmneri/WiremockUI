﻿using System;
using System.Diagnostics;
using WiremockUI.Languages;
using System.Windows.Forms;

namespace WiremockUI
{
    public partial class FormImageFile : Form, IFormFileUpdate
    {
        private object tabPage;
        private object master;

        public Action OnSave { get; set; }

        public FormImageFile(FormMaster master, TabPageCustom tabPage, string fileName)
        {
            InitializeComponent();

            this.tabPage = tabPage;
            this.master = master;
            LoadForm(fileName);

            this.btnOpen.Text = Resource.btnOpenExplorer;
            this.btnClose.Text = Resource.btnCloseTab;
        }

        private void LoadForm(string fileName)
        {
            if (fileName != null)
            {
                txtPath.TextValue = fileName;
                imgFile.ImageLocation = fileName;
            }
            else
            {
                txtPath.Enabled = false;
                btnOpen.Enabled = false;
            }
        }

        private void btnOpen_Click(object sender, EventArgs e)
        {
            Process.Start(txtPath.TextValue);
        }

        #region IFormFileUpdate

        public void Update(string fileName)
        {
            LoadForm(fileName);
        }

        public bool CanClose()
        {
            return true;
        }

        #endregion

        private void FormImageFile_Load(object sender, EventArgs e)
        {
            this.ActiveControl = btnOpen;
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            FormMaster.Current.TabMaster.CloseTab(this);
        }
    }
}
